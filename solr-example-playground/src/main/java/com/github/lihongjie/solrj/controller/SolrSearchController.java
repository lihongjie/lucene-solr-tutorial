package com.github.lihongjie.solrj.controller;

import com.github.lihongjie.solrj.domain.Product;
import com.github.lihongjie.solrj.domain.support.FacetingResponse;
import com.github.lihongjie.solrj.domain.support.ProductQueryRequest;
import com.github.lihongjie.solrj.domain.support.ProductResponse;
import com.github.lihongjie.solrj.domain.support.Suggestion;
import com.github.lihongjie.solrj.service.SearchService;
import org.apache.solr.client.solrj.SolrServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Controller
public class SolrSearchController {

    @Autowired
    private SearchService searchService;

    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public String searchProducts(@ModelAttribute  ProductQueryRequest request, Model model) throws IOException, SolrServerException {

        ProductResponse response = searchService.termSearch(request);
        FacetingResponse facetingResponse = searchService.facetQuery(request);
        model.addAttribute("facets", facetingResponse.getFacetFields());
        model.addAttribute("hitCount", response.getHitCount());
        model.addAttribute("products", response.getProducts());
        model.addAttribute("query", request.getQuery());
        return "index";
    }

    @RequestMapping(value = "/search/{id}", method = RequestMethod.GET)
    public String getProductById(@PathVariable String id, Model model) throws IOException, SolrServerException {

        Product product = searchService.findById(id);
        model.addAttribute("product", product);
        return "detail";
    }

    @RequestMapping(value = "/facet", method = RequestMethod.GET)
    public String faceting(ProductQueryRequest request, Model model) throws IOException, SolrServerException {

        FacetingResponse response = searchService.facetQuery(request);
        model.addAttribute("facets", response.getFacetFields());
        return "facet";
    }

    @RequestMapping(value = "/suggest", method = RequestMethod.GET)
    public ResponseEntity autoComplete(@RequestParam String q) throws IOException, SolrServerException {

        List<Suggestion> suggestionList = searchService.findSuggestions(q);
        return ResponseEntity.ok().body(" sugg({\"suggestions\":[111,222,333,444,5555,5555,666,777,999,888]})");
    }
}
