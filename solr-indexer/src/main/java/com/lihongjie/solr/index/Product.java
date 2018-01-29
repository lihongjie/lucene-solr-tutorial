package com.lihongjie.solr.index;

import org.apache.solr.client.solrj.beans.Field;

import java.util.Date;

public class Product {

    @Field(value = "id")
    private String id;

    @Field(value = "subject")
    private String subject;

    @Field(value = "last_modified")
    private Date date;

    @Field(value = "content")
    private String content;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
