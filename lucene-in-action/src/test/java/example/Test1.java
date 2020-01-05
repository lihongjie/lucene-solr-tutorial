package example;

import example.util.SearchUtil;
import org.junit.Test;

public class Test1 {

    @Test
    public void test() throws Exception {

        String indexDir = "E:\\lucenetemp\\index";
        String q = "EarlyTerminating-Collector";

        SearchUtil.search(indexDir, q);

    }
}
