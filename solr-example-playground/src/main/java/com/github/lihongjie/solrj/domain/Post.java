package com.github.lihongjie.solrj.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.solr.client.solrj.beans.Field;

import java.util.Date;
import java.util.List;

@Deprecated
public class Post {




    @Field
    private List<String> features;


    @Field
    private String includes;
    @Field
    private String manu;
    @Field("manuId")
    @JsonProperty("manuId")
    private String manuId; // manuId
    @Field
    private String payloads;

    @Field
    private List<String> store;
    @Field
    private String title;


    @Field("manufacturedate_dt")
    @JsonProperty("manufacturedate_dt")
    private Date manuFactureDate;


}
