package com.github.lihongjie.solrj.repository;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.FacetField;

import java.io.IOException;

public interface SolrFacetingRepository {

    FacetField faceting(SolrQuery solrQuery) throws IOException, SolrServerException;
}
