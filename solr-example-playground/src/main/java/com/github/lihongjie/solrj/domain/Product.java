package com.github.lihongjie.solrj.domain;

import org.apache.solr.client.solrj.beans.Field;

import java.util.Date;
import java.util.List;

import static com.github.lihongjie.solrj.domain.ProductField.*;

public class Product {

    @Field(ID_FIELD)
    private String id;

    @Field(NAME_FIELD)
    private String name; // 名称

    @Field("manu")
    private String manu; // 生产厂商

    @Field("manu_id_s")
    private String manuId; // 生产厂商别名

    @Field(CATEGORY_FIELD)
    private List<String> categories; // 产品分类

    @Field("features")
    private List<String> features; //功能

    @Field("payloads")
    private String payloads;

    private List<String> includes;

    @Field(value = WEIGHT_FIELD)
    private float weight; // 重量

    @Field(PRICE_FIELD)
    private float price; // 价格

    @Field(POPULARITY_FIELD)
    private int popularity;

    @Field(INSTOCK_FIELD)
    private boolean inStock; // 是否有库存

    @Field("store")
    private String store; // 经伟度


    @Field("manufacturedate_dt")
    private Date manuFactureDate; // 生产日期


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManu() {
        return manu;
    }

    public void setManu(String manu) {
        this.manu = manu;
    }

    public String getManuId() {
        return manuId;
    }

    public void setManuId(String manuId) {
        this.manuId = manuId;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

    public String getPayloads() {
        return payloads;
    }

    public void setPayloads(String payloads) {
        this.payloads = payloads;
    }

    public List<String> getIncludes() {
        return includes;
    }

    public void setIncludes(List<String> includes) {
        this.includes = includes;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getPopularity() {
        return popularity;
    }

    public void setPopularity(int popularity) {
        this.popularity = popularity;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }

    public String getStore() {
        return store;
    }

    public void setStore(String store) {
        this.store = store;
    }

    public Date getManuFactureDate() {
        return manuFactureDate;
    }

    public void setManuFactureDate(Date manuFactureDate) {
        this.manuFactureDate = manuFactureDate;
    }
}
