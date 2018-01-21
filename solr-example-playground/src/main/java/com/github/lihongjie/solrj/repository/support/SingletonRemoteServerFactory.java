package com.github.lihongjie.solrj.repository.support;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.springframework.stereotype.Component;

@Component
public class SingletonRemoteServerFactory implements ServerFactory {



    public SolrClient getSolrClientServer() {

        return new HttpSolrClient("http://192.168.31.122:8983/solr/techproducts");
    }

    @Deprecated
    public SolrServer getSolrServer() {
        return null;
    }
}
