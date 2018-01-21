package com.github.lihongjie.solrj.repository;


import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.common.SolrDocumentList;

import java.io.IOException;

public interface SolrCrudRepository {

    SolrDocumentList findById(String id) throws IOException, SolrServerException;
}
