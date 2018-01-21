package com.github.lihongjie.solrj.domain.support;


import org.apache.solr.client.solrj.response.FacetField;
import org.apache.solr.common.SolrDocumentList;

import java.util.List;
import java.util.Map;

public class SearchResults {

    private SolrDocumentList docs;

    private FacetField facetField;

    private String cursorMark;

    private Map<String, Map<String, List<String>>> highlight;

    public SolrDocumentList getDocs() {
        return docs;
    }

    public void setDocs(SolrDocumentList docs) {
        this.docs = docs;
    }

    public String getCursorMark() {
        return cursorMark;
    }

    public void setCursorMark(String cursorMark) {
        this.cursorMark = cursorMark;
    }

    public FacetField getFacetField() {
        return facetField;
    }

    public void setFacetField(FacetField facetField) {
        this.facetField = facetField;
    }

    public Map<String, Map<String, List<String>>> getHighlight() {
        return highlight;
    }

    public void setHighlight(Map<String, Map<String, List<String>>> highlight) {
        this.highlight = highlight;
    }

    private SearchResults(Builder builder) {
        docs = builder.docs;
        cursorMark = builder.cursorMark;
        facetField = builder.facetField;
        highlight = builder.highlight;
    }

    public static class Builder {

        private SolrDocumentList docs;

        private FacetField facetField;

        private String cursorMark;

        private Map<String, Map<String, List<String>>> highlight;

        public Builder documents(SolrDocumentList documents) {
            this.docs = documents;
            return this;
        }

        public Builder cursorMark(String cursorMark) {
            this.cursorMark = cursorMark;
            return this;
        }

        public Builder setFaceting(FacetField facetField) {
            this.facetField = facetField;
            return this;
        }

        public Builder highlight(Map<String, Map<String, List<String>>> highlights) {
            this.highlight = highlights;
            return this;
        }

        public SearchResults build() {
            return new SearchResults(this);
        }
    }

}
