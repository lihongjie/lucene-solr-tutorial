package com.github.lihongjie.solrj.repository;


import org.apache.solr.client.solrj.SolrQuery;

public interface SolrSpellcheckingRepository {

    void spellChecking(SolrQuery solrQuery);
}
