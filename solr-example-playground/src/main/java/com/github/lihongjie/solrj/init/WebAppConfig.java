package com.github.lihongjie.solrj.init;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

import javax.annotation.Resource;

@Configuration
@EnableWebMvc
@ComponentScan("com.github.lihongjie.solrj")
@PropertySource("classpath:application.properties")
public class WebAppConfig extends WebMvcConfigurerAdapter {

	@Resource
	private Environment env;

	@Bean
	public UrlBasedViewResolver setupViewResolver() {
		UrlBasedViewResolver resolver = new UrlBasedViewResolver();
		resolver.setPrefix("/WEB-INF/pages/");
		resolver.setSuffix(".jsp");
		resolver.setViewClass(JstlView.class);
		return resolver;
	}

	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
	}

//*//*	public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {
//		SimpleMappingExceptionResolver simpleMappingExceptionResolver = new SimpleMappingExceptionResolver();
//
//		exceptionResolvers.add(simpleMappingExceptionResolver);
//	}*//*
//
//	@Bean(name="simpleMappingExceptionResolver")
//	public SimpleMappingExceptionResolver createSimpleMappingExceptionResolver() {
//		SimpleMappingExceptionResolver r =
//				new SimpleMappingExceptionResolver();
//
//*//*		Properties mappings = new Properties();
//		mappings.setProperty("DatabaseException", "databaseError");
//		mappings.setProperty("InvalidCreditCardException", "creditCardError");
//
//		r.setExceptionMappings(mappings);  // None by default
//		r.setDefaultErrorView("error");    // No default
//		r.setExceptionAttribute("ex");     // Default is "exception"
//		r.setWarnLogCategory("example.MvcLogger");     // No default*//*
//		return r;
//	}*/

}
