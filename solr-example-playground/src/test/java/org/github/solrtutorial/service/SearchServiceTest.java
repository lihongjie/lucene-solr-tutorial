package org.github.solrtutorial.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.lihongjie.solrj.domain.Post;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.beans.DocumentObjectBinder;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.util.ClientUtils;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.params.CursorMarkParams;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


public class SearchServiceTest {

    private SolrClient client = new HttpSolrClient("http://192.168.31.23:8983/solr/techproducts");

    private static ObjectMapper objectMapper;



    public static void main(String[] args) throws SolrServerException,
            IOException {
        SearchServiceTest searchService = new SearchServiceTest();
//        searchService.filterQuery();
//        searchService.deepPaging();
        searchService.faceting();
    }


    private void filterQuery() {

        SolrQuery solrQuery = new SolrQuery();
        solrQuery.setQuery("*:*");
        solrQuery.setFacet(true);
        solrQuery.setFields("");
        try {
            QueryResponse response = client.query(solrQuery);
            SolrDocumentList docs = response.getResults();
            System.out.println("输出结果为： ");
            // 1. 实际上也是使用DocumentObjectBinder 转换, POJO对象的Field上指定@Field注解
            List<Post> posts = response.getBeans(Post.class);

            List<Post> postList = new ArrayList();
            Iterator iterator = docs.iterator();
            while (iterator.hasNext()) {
                System.out.println(iterator.next());
            }
            // 2. 使用JSON 转 Java POJO
//            for (int i = 0; i < docs.size(); i++) {
//                String str = (String) docs.get(i).getFieldValue("SolrDocument");
//                SolrDocument solrDocument = docs.get(i);
//
//                Post post = objectMapper.readValue(str, Post.class);
//                System.out.println(docs.get(i));
//                System.out.println(post);
//                postList.add(post);
//            }
            // 3. 使用 org.apache.solr.client.solrj.beans.DocumentObjectBinder转换， POJO对象的Field上指定@Field注解
            DocumentObjectBinder binder = new DocumentObjectBinder();
            postList = binder.getBeans(Post.class, docs);
            for (Post post : postList) {
                System.out.println(post);
            }

            String url = "*:*";
            System.out.println(ClientUtils.escapeQueryChars(url));
        } catch (SolrServerException e) {

            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void deepPaging() throws IOException, SolrServerException {
        SolrQuery query = new SolrQuery();
        query.setQuery("*:*")
                .setRows(10)
                .setSort(SolrQuery.SortClause.asc("id"))
                .setFields("name cat score");
        String cursorMark = CursorMarkParams.CURSOR_MARK_START;
//        String cursorMark = "AoEpdm lld3Nvbmlj";
        System.out.println("current cursorMark is : " + cursorMark);
        boolean done = false;
        while (!done) {
            query.set(CursorMarkParams.CURSOR_MARK_PARAM, cursorMark);
            QueryResponse rsp = client.query(query);
            System.out.println("Response size is : " + rsp.getResults().size());
            String nextCursorMark = rsp.getNextCursorMark();
            System.out.println("next cursorMark is : " + nextCursorMark);
            if (cursorMark.equals(nextCursorMark)) {
                done = true;
            }
            cursorMark = nextCursorMark;
        }

    }

    private void faceting() throws IOException, SolrServerException {
        SolrQuery query = new SolrQuery();
        query.setQuery("Test")
                .setRows(50)
                .setSort(SolrQuery.SortClause.asc("id"))
                .setFields("name");

        QueryResponse rsp = client.query(query);

        SolrDocumentList docs = rsp.getResults();

    }
}
