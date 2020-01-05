package example;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.cn.smart.SmartChineseAnalyzer;
import org.apache.lucene.document.*;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.search.highlight.Highlighter;
import org.apache.lucene.search.highlight.QueryScorer;
import org.apache.lucene.search.highlight.SimpleHTMLFormatter;
import org.apache.lucene.search.highlight.SimpleSpanFragmenter;
import org.apache.lucene.store.FSDirectory;
import org.junit.Before;
import org.junit.Test;

import java.io.StringReader;
import java.nio.file.Paths;

public class TestHighlight {

    private Integer ids[] = {1, 2, 3};
    private String citys[] = {"青岛", "西安", "上海"};
    private String descs[] = {"青岛是个美丽的城市。",
            "西安，古称长安、镐京，是陕西省会、副省级市、关中平原城市群核心城市，曾是古丝绸之路的起点 [1]  ，是“一带一路”核心区、中国西部地区重要的中心城市，是国家重要的科研、教育、工业基地 [2-6]  。联合国教科文组织于1981年确定的“世界历史名城” [2]  。地处关中平原中部，北濒渭河，南依秦岭，八水润长安。",
            "上海市个繁华的城市。"};

    private FSDirectory dir;

    /**
     * 每次都生成索引文件
     *
     * @throws Exception
     */
    @Before
    public void setUp() throws Exception {
        dir = FSDirectory.open(Paths.get("E:\\lucenetemp\\demo4\\indexDir"));
        IndexWriter indexWriter = getIndexWriter();
        for (int i = 0; i < ids.length; i++) {
            Document doc = new Document();
            doc.add(new IntField("id", ids[i], Field.Store.YES));
            doc.add(new StringField("city", citys[i], Field.Store.YES));
            doc.add(new TextField("desc", descs[i], Field.Store.YES));
            indexWriter.addDocument(doc);
        }
        indexWriter.close();
    }

    /**
     * 获取索引输出流
     *
     * @return
     * @throws Exception
     */
    private IndexWriter getIndexWriter() throws Exception {
//        Analyzer analyzer = new StandardAnalyzer();
        Analyzer analyzer = new SmartChineseAnalyzer();
        IndexWriterConfig conf = new IndexWriterConfig(analyzer);
        return new IndexWriter(dir, conf);
    }

    /**
     * 测试高亮
     *
     * @throws Exception
     */
    @Test
    public void testHighlightDemo() throws Exception {
        IndexReader reader = DirectoryReader.open(dir);
        IndexSearcher searcher = new IndexSearcher(reader);

        SmartChineseAnalyzer analyzer = new SmartChineseAnalyzer();
        QueryParser parser = new QueryParser("desc", analyzer);

        Query query = parser.parse("西安");
        TopDocs hits = searcher.search(query, 100);
        System.out.println(hits.totalHits);
        // 查询得分项
        QueryScorer queryScorer = new QueryScorer(query);
        // 得分项对应的内容片段
        SimpleSpanFragmenter fragmenter = new SimpleSpanFragmenter(queryScorer);
        // 高亮显示的样式
        SimpleHTMLFormatter htmlFormatter = new SimpleHTMLFormatter("<em color='red'><b>", "</b></em>");
        // 高亮显示对象
        Highlighter highlighter = new Highlighter(htmlFormatter, queryScorer);
        // 设置需要高亮显示对应的内容片段
        highlighter.setTextFragmenter(fragmenter);

        for (ScoreDoc scoreDoc : hits.scoreDocs) {
            Document doc = searcher.doc(scoreDoc.doc);
            String desc = doc.get("desc");
            if (desc != null) {
                // tokenstream是从doucment的域（field)中抽取的一个个分词而组成的一个数据流，用于分词。
                TokenStream tokenStream = analyzer.tokenStream("desc", new StringReader(desc));
                System.out.println("搜索结果高亮显示片段：" + highlighter.getBestFragment(tokenStream, desc));
            }
            System.out.println("搜索结果：" + desc);
        }

    }
}
