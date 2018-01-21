package com.github.lihongjie.solrj.repository.support;

import com.github.lihongjie.solrj.domain.support.SearchResults;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.FacetField;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.SpellCheckResponse;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.params.CursorMarkParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Repository
public class DefaultSolrQueryRepository extends SolrQueryRepository {

    private Logger log = LoggerFactory.getLogger(DefaultSolrQueryRepository.class);

    @Autowired
    private ServerFactory serverFactory;

    private SolrClient client;

    private SolrClient getClient() {
        if (client == null) {
            this.client = serverFactory.getSolrClientServer();
        }
        return client;
    }

    /**
     * 使用分页查询
     *
     * @param query
     * @return
     */
    public SearchResults queryWithPaging(SolrQuery query) throws IOException, SolrServerException {

        QueryResponse rsp = getClient().query(query);
        Map<String, Map<String, List<String>>> highlights = rsp.getHighlighting();

        return new SearchResults
                .Builder()
                .highlight(highlights)
                .build();
    }

    /**
     * 使用cursorMark 查询
     *
     * @param query
     * @return
     * @throws IOException
     * @throws SolrServerException
     */
    public SearchResults queryWithCursors(SolrQuery query) throws IOException, SolrServerException {
        SolrClient client = getClient();
        String cursorMark = CursorMarkParams.CURSOR_MARK_START;
        query.set(CursorMarkParams.CURSOR_MARK_PARAM, cursorMark);
        QueryResponse rsp = client.query(query);
        SolrDocumentList docs = rsp.getResults();
        String nextCursorMark = rsp.getNextCursorMark();
/*        if (cursorMark.equals(nextCursorMark)) {
            cursorMark = nextCursorMark;
        }*/
        return new SearchResults
                .Builder()
                .documents(docs)
                .cursorMark(nextCursorMark)
                .build();
    }

    /**
     * 功能齐全的查询
     *
     * @param query
     * @return
     */
    public SearchResults query(SolrQuery query) throws IOException, SolrServerException {

        String cursorMark = CursorMarkParams.CURSOR_MARK_START;
        query.set(CursorMarkParams.CURSOR_MARK_PARAM, cursorMark);
        QueryResponse rsp = getClient().query(query);
        SolrDocumentList docs = rsp.getResults();
        String nextCursorMark = rsp.getNextCursorMark();

        return new SearchResults
                .Builder()
                .documents(docs)
                .cursorMark(nextCursorMark)
                .build();
    }

    public List<SolrDocumentList> filteredQuery(SolrQuery solrQuery) {

        return null;
    }


    /**
     * 自动提示
     *
     * @param solrQuery
     */
    public SpellCheckResponse autoSuggest(SolrQuery solrQuery) throws IOException, SolrServerException {

        SolrClient client = getClient();

        QueryResponse response = client.query(solrQuery);
        return response.getSpellCheckResponse();
    }

    /**
     * 拼写检查
     *
     * @param solrQuery
     */
    public void spellChecking(SolrQuery solrQuery) {

    }

    /**
     * 分组查询 Faceting
     * 包含有数量为0的分组
     *
     * @param solrQuery
     */
    public FacetField faceting(SolrQuery solrQuery) throws IOException, SolrServerException {

        SolrClient client = getClient();

        QueryResponse response = client.query(solrQuery);

        // get facet list and counts
        FacetField facetField = response.getFacetField("cat");

        return facetField;
    }

    public SolrDocumentList findById(String id) throws IOException, SolrServerException {

        SolrClient client = getClient();
        SolrQuery query = new SolrQuery().setQuery("id:" + id);
        QueryResponse response = client.query(query);

        return response.getResults();
    }
}
