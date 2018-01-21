package com.github.lihongjie.solrj.repository;


import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.SpellCheckResponse;

import java.io.IOException;

public interface SolrAutosuggestRepository {

    SpellCheckResponse autoSuggest(SolrQuery solrQuery) throws IOException, SolrServerException;
}
