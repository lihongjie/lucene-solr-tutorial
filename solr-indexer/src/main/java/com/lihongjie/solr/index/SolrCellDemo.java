package com.lihongjie.solr.index;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.request.AbstractUpdateRequest;
import org.apache.solr.client.solrj.request.ContentStreamUpdateRequest;
import org.apache.solr.common.util.NamedList;
import org.apache.solr.handler.extraction.ExtractingParams;

import java.io.File;
import java.io.IOException;

public class SolrCellDemo {

    public static void main(String[] args) throws IOException, SolrServerException {
        SolrClient client = new HttpSolrClient.Builder("http://192.168.31.23:8983/solr/jcg").build();
        ContentStreamUpdateRequest req = new ContentStreamUpdateRequest("/update/extract");
        File file = new File("d://chinese-japan.pdf");

        String contentType="application/octet-stream";
        req.addFile(file, contentType);

        // if id value is exist, update the document.

        req.setParam(ExtractingParams.LITERALS_PREFIX + "id", "doc3");

        // 不添加的话不会及时放到索引中去
        req.setAction(AbstractUpdateRequest.ACTION.COMMIT, true, true);
        NamedList<Object> result = client.request(req);
        System.out.println("Result: " + result);
    }
}
