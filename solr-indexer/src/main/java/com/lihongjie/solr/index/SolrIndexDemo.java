package com.lihongjie.solr.index;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.common.SolrInputDocument;

import java.io.IOException;
import java.util.Date;
import java.util.UUID;

public class SolrIndexDemo {

    public static void main(String[] args) throws IOException, SolrServerException {

        SolrClient client = new HttpSolrClient.Builder("http://192.168.31.23:8983/solr/jcg").build();

        // Indexing Documents
        // 方式一
//        client.addBean(buildProduct());
//        client.commit();
        // 方式二
        SolrInputDocument doc = new SolrInputDocument();
        doc.addField("id", UUID.randomUUID().toString());
        doc.addField("subject", "solr");
        doc.addField("content", "apache lucene solr 官网历史版本下载地址");
        doc.addField("last_modified", new Date());
        client.add(doc);
        client.commit();
    }

    private static Product buildProduct() {

        Product product = new Product();
        product.setId(UUID.randomUUID().toString());
        product.setSubject("solr");
        product.setContent("apache lucene solr 官网历史版本下载地址");
        product.setDate(new Date());
        return product;
    }

    // 批量 index
    private static void index() throws IOException, SolrServerException {
        SolrClient client = new HttpSolrClient.Builder("http://localhost:8983/solr/collection1").build();
        for(int i=0;i<1000;++i) {
            SolrInputDocument doc = new SolrInputDocument();
            doc.addField("cat", "book");
            doc.addField("id", "book-" + i);
            doc.addField("name", "The Legend of the Hobbit part " + i);
            client.add(doc);
            if(i % 100 == 0)
                client.commit();  // periodically flush 定期冲洗
        }
        client.commit();

    }
}
