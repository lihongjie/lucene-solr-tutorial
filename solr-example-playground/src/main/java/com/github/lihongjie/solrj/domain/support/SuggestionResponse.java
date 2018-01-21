package com.github.lihongjie.solrj.domain.support;

import java.util.List;

/**
 * Created by lihongjie on 6/25/17.
 */
public class SuggestionResponse {

    List<Suggestion> suggestions;

    public List<Suggestion> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<Suggestion> suggestions) {
        this.suggestions = suggestions;
    }
}
