package com.github.lihongjie.solrj.domain.support;

import java.util.List;

public class FacetingResponse {

    List<FacetFieldEntry> facetFields;

    public FacetingResponse(List<FacetFieldEntry> facetFields) {
        this.facetFields = facetFields;
    }

    public List<FacetFieldEntry> getFacetFields() {
        return facetFields;
    }

    public void setFacetFields(List<FacetFieldEntry> facetFields) {
        this.facetFields = facetFields;
    }
}
