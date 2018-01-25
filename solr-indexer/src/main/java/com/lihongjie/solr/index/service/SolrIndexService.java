package com.lihongjie.solr.index.service;

import org.apache.solr.common.util.NamedList;

import java.io.File;
import java.util.Collection;

public interface SolrIndexService {

    NamedList<Object> index(Collection<File> files, String solrId);
}
