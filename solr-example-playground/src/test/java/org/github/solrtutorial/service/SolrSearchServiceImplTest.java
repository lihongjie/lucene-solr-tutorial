package org.github.solrtutorial.service;

import com.github.lihongjie.solrj.domain.support.ProductQueryRequest;
import com.github.lihongjie.solrj.service.SearchService;
import org.apache.solr.client.solrj.SolrServerException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.io.IOException;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class SolrSearchServiceImplTest {

    @Autowired
    private SearchService searchService;

    @Test
    public void testConvertProduct() throws IOException, SolrServerException {
        ProductQueryRequest request = new ProductQueryRequest();
        request.setQuery("Test");
        searchService.search(request);

    }

    @Test
    public void testFacetQuery() throws IOException, SolrServerException {
        ProductQueryRequest request = new ProductQueryRequest();
        request.setQuery("*:*");
        searchService.facetQuery(request);
    }

    @Test
    public void testAutoComplete() throws IOException, SolrServerException {
        String term = "25";
        searchService.findSuggestions(term);
    }

}
