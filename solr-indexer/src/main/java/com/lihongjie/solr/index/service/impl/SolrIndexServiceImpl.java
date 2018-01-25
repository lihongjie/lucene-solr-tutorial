package com.lihongjie.solr.index.service.impl;

import com.lihongjie.solr.index.service.SolrIndexService;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.request.AbstractUpdateRequest;
import org.apache.solr.client.solrj.request.ContentStreamUpdateRequest;
import org.apache.solr.common.util.NamedList;
import org.apache.solr.handler.extraction.ExtractingParams;

import java.io.File;
import java.util.Collection;

public class SolrIndexServiceImpl implements SolrIndexService {

    private static final String BASE_SOLR_URL = "http://192.168.31.23:8983/solr/jcg";

    private static final String UPDATE_EXTRACT = "/update/extract";

    private static final String DEFAULT_CONTENT_TYPE = "application/octet-stream";

    private static final SolrClient solrClient = new HttpSolrClient.Builder(BASE_SOLR_URL).build();

    public NamedList<Object> index(Collection<File> files, String solrId) {

        NamedList<Object> result = null;
//        log.debug(String.format("Trying to save Files [%s] into Solr", files));

        if (files == null || files.isEmpty()){
//            log.debug("No files to add.");
            return result;
        }
        try {
            ContentStreamUpdateRequest req = new ContentStreamUpdateRequest(UPDATE_EXTRACT);
            for (File file : files) {
                req.addFile(file, DEFAULT_CONTENT_TYPE);
            }
            req.setParam(ExtractingParams.LITERALS_PREFIX + "id", solrId);
            req.setAction(AbstractUpdateRequest.ACTION.COMMIT, true, true);
            result = buildSolrClient().request(req);
        } catch (Exception e) {
//            log.error(String.format("Failure while File-Save-Operation for Files [%s]", files),e);
        }
        return result;
    }

    private SolrClient buildSolrClient() {

        if (solrClient == null) {
            return new HttpSolrClient.Builder(BASE_SOLR_URL).build();
        }
        return solrClient;
    }
}
