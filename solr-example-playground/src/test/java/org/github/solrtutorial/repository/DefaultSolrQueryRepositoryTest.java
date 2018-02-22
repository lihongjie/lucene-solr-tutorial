package org.github.solrtutorial.repository;

import com.github.lihongjie.solrj.repository.support.DefaultSolrQueryRepository;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.FacetField;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class DefaultSolrQueryRepositoryTest extends AbstractJUnit4SpringContextTests {

    private Logger log = LoggerFactory.getLogger(DefaultSolrQueryRepositoryTest.class);

    @Autowired
    private DefaultSolrQueryRepository solrQueryRepository;

    private SolrClient client = new HttpSolrClient("http://192.168.31.23:8983/solr/techproducts");

    @Test
    public void testQueryWithCursors() throws IOException, SolrServerException {

        SolrQuery solrQuery = new SolrQuery();
        solrQuery.setQuery("name:Technology");
        solrQuery.setFields("");
        solrQuery.setRows(10);
        solrQuery.setTerms(true);

//        solrQuery.setSort(SolrQuery.SortClause.asc("id"));

//        List<SolrDocument> list = solrQueryRepository.queryWithCursors(solrQuery);
//        list.size();

        List<SolrDocument> list = client.query(solrQuery).getResults();
        list.size();
    }

    @Test
    public void testFaceting() throws IOException, SolrServerException {

        SolrQuery query = new SolrQuery();
        query.setQuery("*:*")
                .setFacet(true)
                .setFacetLimit(-1)
                .setFacetMinCount(1)
                .addFacetField("cat")
                .setFacetSort("count");
        log.info("Facet query: " + query.toString());
        // Facet query: q=*:*&facet=true&facet.limit=-1&facet.mincount=1&facet.field=cat&facet.sort=count
        QueryResponse rsp = client.query(query);
        // skip
        SolrDocumentList docs = rsp.getResults();
        FacetField facetField = rsp.getFacetField("cat");

    }

    @Test
    public void testHighlight() throws IOException, SolrServerException {

        SolrQuery query = new SolrQuery();
        query.setQuery("feature OR Test")
                .setHighlight(true)
                .addHighlightField("name")
                .addHighlightField("features")
                .setHighlightFragsize(100)
                .setHighlightSimplePre("<em>")
                .setHighlightSimplePost("</em>")
                .setRows(10);

        QueryResponse rsp = client.query(query);

        SolrDocumentList docs = rsp.getResults();

        Map<String, Map<String, List<String>>> hightlights = rsp.getHighlighting();

    }
    @Test
    public void testQueryWithPaging() {

    }


    @Test
    public void testQuery() {

    }

    @Test
    public void testFindById() throws IOException, SolrServerException {
        String id = "GB18030TEST";

        SolrDocumentList response = solrQueryRepository.findById(id);
    }

}
