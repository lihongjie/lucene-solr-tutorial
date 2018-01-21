package com.github.lihongjie.solrj.domain.support;

import com.github.lihongjie.solrj.domain.Product;

import java.util.List;

public class ProductResponse {

    private List<Product> products;

    private Long hitCount;

    private String cursorMark;

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public Long getHitCount() {
        return hitCount;
    }

    public void setHitCount(Long hitCount) {
        this.hitCount = hitCount;
    }

    public String getCursorMark() {
        return cursorMark;
    }

    public void setCursorMark(String cursorMark) {
        this.cursorMark = cursorMark;
    }

    private ProductResponse(Builder builder) {
        products = builder.products;
        hitCount = builder.hitCount;
        cursorMark = builder.cursorMark;
    }

    public static class Builder {

        private List<Product> products;

        private Long hitCount;

        private String cursorMark;

        public Builder setProducts(List<Product> products) {
            this.products = products;
            return this;
        }

        public Builder setHitCount(long hitCount) {
            this.hitCount = hitCount;
            return this;
        }

        public Builder setCursormark(String cursorMark) {
            this.cursorMark = cursorMark;
            return this;
        }

        public ProductResponse build() {
            return new ProductResponse(this);
        }
    }
}
