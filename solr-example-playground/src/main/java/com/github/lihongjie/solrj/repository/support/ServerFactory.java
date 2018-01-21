package com.github.lihongjie.solrj.repository.support;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServer;

public interface ServerFactory {

    SolrClient getSolrClientServer();

    SolrServer getSolrServer();
}
