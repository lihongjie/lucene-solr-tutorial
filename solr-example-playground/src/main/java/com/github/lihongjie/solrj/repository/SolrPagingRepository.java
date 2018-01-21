package com.github.lihongjie.solrj.repository;

import com.github.lihongjie.solrj.domain.support.SearchResults;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;

import java.io.IOException;

public interface SolrPagingRepository {

    SearchResults queryWithPaging(SolrQuery query) throws IOException, SolrServerException;

    SearchResults queryWithCursors(SolrQuery query) throws IOException, SolrServerException;

    SearchResults query(SolrQuery query) throws IOException, SolrServerException;
}
