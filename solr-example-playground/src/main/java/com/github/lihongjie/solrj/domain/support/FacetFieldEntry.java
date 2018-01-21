package com.github.lihongjie.solrj.domain.support;


public class FacetFieldEntry {

    private  String name;

    private  long count;

    private boolean isSelected;

    // private constructor
    private FacetFieldEntry(Builder builder) {
        name = builder.name;
        count = builder.count;
        isSelected = builder.isSelected;
    }

    public String getName() {
        return name;
    }

    public long getCount() {
        return count;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public boolean isSelected() {
        return isSelected;
    }

    public void setSelected(boolean selected) {
        isSelected = selected;
    }

    public static class Builder {

        private  String name;

        private  long count;

        private boolean isSelected;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder count(long count) {
            this.count = count;
            return this;
        }

        public Builder selected(boolean selected) {
            this.isSelected = selected;
            return this;
        }

        public FacetFieldEntry build() {

            return new FacetFieldEntry(this);
        }
    }
}
