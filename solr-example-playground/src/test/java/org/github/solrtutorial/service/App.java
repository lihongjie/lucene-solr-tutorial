package org.github.solrtutorial.service;

import java.io.IOException;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;

public class App {

	public static void main(String[] args) throws SolrServerException,
			IOException {
		
		 SolrClient client = new HttpSolrClient("http://192.168.31.122:8983/solr/post");
		
		 QueryResponse queryResponse = client.query(new SolrQuery("*:*"));
		 System.out.println(queryResponse.toString());
		 SolrDocumentList results = queryResponse.getResults();
		 for (int i = 0; i < results.size(); i++) {
		 System.out.println(results.get(i));
		 }
		

//		HttpSolrServer server = new HttpSolrServer("http://localhost:8983/solr");
//		for (int i = 0; i < 1000; ++i) {
//			SolrInputDocument doc = new SolrInputDocument();
//			doc.addField("cat", "book");
//			doc.addField("id", "book-" + i);
//			doc.addField("name", "The Legend of the Hobbit part " + i);
//			server.add(doc);
//			if (i % 100 == 0)
//				server.commit(); // periodically flush
//		}
//		server.commit();

	}

}
