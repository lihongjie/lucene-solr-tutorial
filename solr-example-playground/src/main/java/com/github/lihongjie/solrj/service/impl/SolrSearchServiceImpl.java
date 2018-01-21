package com.github.lihongjie.solrj.service.impl;

import com.github.lihongjie.solrj.domain.Product;
import com.github.lihongjie.solrj.domain.support.*;
import com.github.lihongjie.solrj.repository.support.DefaultSolrQueryRepository;
import com.github.lihongjie.solrj.service.SearchService;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.beans.DocumentObjectBinder;
import org.apache.solr.client.solrj.response.FacetField;
import org.apache.solr.client.solrj.response.SpellCheckResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SolrSearchServiceImpl implements SearchService {

    @Autowired
    private DefaultSolrQueryRepository defaultSolrQueryRepository;

    /**
     * Search
     *
     * @param request
     * @return
     * @throws IOException
     * @throws SolrServerException
     */
    public ProductResponse search(ProductQueryRequest request) throws IOException, SolrServerException {

        SolrQuery query = new SolrQuery();
        query.setQuery("features:" + request.getQuery())
                .setFilterQueries(request.getCat())
                .setStart(request.getStart())
                .setRows(request.getRows())
                .setHighlight(true)
                .addHighlightField("features")
                .setSort(SolrQuery.SortClause.asc("id"));
        SearchResults results = defaultSolrQueryRepository.queryWithPaging(query);
        List<Product> products = convert(results.getHighlight());
        return new ProductResponse.Builder()
                .setProducts(products)
                .setHitCount(results.getDocs()
                        .getNumFound())
                .setCursormark(results
                        .getCursorMark())
                .build();
    }

    public ProductResponse termSearch(ProductQueryRequest request) throws IOException, SolrServerException {
        SolrQuery query = new SolrQuery();
        query.setQuery(request.getQuery())
                .setFilterQueries(request.getCat())
                .setSort(SolrQuery.SortClause.asc("id"));
        SearchResults results = defaultSolrQueryRepository.query(query);
        List<Product> products = convert(results.getDocs());
        return new ProductResponse.Builder()
                .setProducts(products)
                .setHitCount(results.getDocs()
                        .getNumFound())
                .setCursormark(results
                        .getCursorMark())
                .build();
    }

    public ProductResponse searchAll(ProductQueryRequest request) {

        return null;
    }

    /**
     * Facet query
     *
     * @param request
     * @return
     * @throws IOException
     * @throws SolrServerException
     */
    public FacetingResponse facetQuery(ProductQueryRequest request) throws IOException, SolrServerException {

        SolrQuery query = new SolrQuery();
        query.setQuery(request.getQuery())
                .setFacet(true)
                .setFacetMinCount(1)
                .addFacetField("cat")
                .setFacetSort("count");
        FacetField facetField = defaultSolrQueryRepository.faceting(query);
        List<FacetFieldEntry> facetFieldEntries = convertFacetFieldToEntry(facetField, request.getCat());
        return new FacetingResponse(facetFieldEntries);
    }

    public Product findById(String id) throws IOException, SolrServerException {

        SolrDocumentList solrDocuments = defaultSolrQueryRepository.findById(id);
        DocumentObjectBinder binder = new DocumentObjectBinder();
        SolrDocument solrDocument = solrDocuments.get(0);
        return binder.getBean(Product.class, solrDocument);
    }

    @Override
    public List<Suggestion> findSuggestions(String term) throws IOException, SolrServerException {

        SolrQuery query = new SolrQuery();
        query.setQuery(term);
        query.setRequestHandler("/suggest");
        SpellCheckResponse spellCheckResponse = defaultSolrQueryRepository.autoSuggest(query);
        List<Suggestion> suggestions = new ArrayList<>();
        for (String str: spellCheckResponse.getSuggestion(term).getAlternatives()) {
            Suggestion suggestion = new Suggestion();
            suggestion.setValue(str);
            suggestions.add(suggestion);
        }
        return suggestions;
    }

    private List<FacetFieldEntry> convertFacetFieldToEntry(FacetField facetField, String filterItem) {

        List<FacetFieldEntry> fieldEntries = new ArrayList<FacetFieldEntry>();

        for (FacetField.Count count : facetField.getValues()) {
            fieldEntries.add(new FacetFieldEntry.Builder()
                    .name(count.getName())
                    .count(count.getCount())
                    .selected(count.getName().equals(filterItem))
                    .build());
        }
        return fieldEntries;
    }

    /**
     * 从SolrDocument 转换 Product
     *
     * @param docs
     * @return
     */
    private List<Product> convert(SolrDocumentList docs) {
        DocumentObjectBinder binder = new DocumentObjectBinder();

        return binder.getBeans(Product.class, docs);
    }

    private List<Product> convert(Map<String, Map<String, List<String>>> highlights) {


        return null;
    }

}
