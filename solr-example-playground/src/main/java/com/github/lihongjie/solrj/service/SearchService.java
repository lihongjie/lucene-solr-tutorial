package com.github.lihongjie.solrj.service;

import com.github.lihongjie.solrj.domain.Product;
import com.github.lihongjie.solrj.domain.support.*;
import org.apache.solr.client.solrj.SolrServerException;

import java.io.IOException;
import java.util.List;

public interface SearchService {

    ProductResponse search(ProductQueryRequest request) throws IOException, SolrServerException;

    ProductResponse termSearch(ProductQueryRequest request) throws IOException, SolrServerException;

    ProductResponse searchAll(ProductQueryRequest request);

    FacetingResponse facetQuery(ProductQueryRequest request) throws IOException, SolrServerException;

    Product findById(String id) throws IOException, SolrServerException;

    List<Suggestion> findSuggestions(String term) throws IOException, SolrServerException;
}
