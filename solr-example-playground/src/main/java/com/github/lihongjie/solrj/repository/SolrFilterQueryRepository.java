package com.github.lihongjie.solrj.repository;


import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.common.SolrDocumentList;

import java.util.List;

public interface SolrFilterQueryRepository {

    List<SolrDocumentList> filteredQuery(SolrQuery solrQuery);
}
