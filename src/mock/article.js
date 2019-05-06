export default {
    respCo: '0000',
    respMsg: '成功',
    data: {
        article: {
            'articleId': 1,
            'title': '前后分离的系统统一加解密',
            'categoryCode': 'java',
            'categoryName': 'Java',
            'createdTime': 1556090343602,
            'content': '\n' +
                '## 依赖\n' +
                '```xml\n' +
                '<parent>\n' +
                '    <groupId>org.springframework.boot</groupId>\n' +
                '    <artifactId>spring-boot-starter-parent</artifactId>\n' +
                '    <version>2.1.3.RELEASE</version>\n' +
                '    <relativePath/> <!-- lookup parent from repository -->\n' +
                '</parent>\n' +
                '\n' +
                '...\n' +
                '\n' +
                '\n' +
                '<!--Log4j2 yml-->\n' +
                '<dependency>\n' +
                '    <groupId>org.springframework.boot</groupId>\n' +
                '    <artifactId>spring-boot-starter-log4j2</artifactId>\n' +
                '</dependency>\n' +
                '<dependency>\n' +
                '    <groupId>com.fasterxml.jackson.dataformat</groupId>\n' +
                '    <artifactId>jackson-dataformat-yaml</artifactId>\n' +
                '    <version>2.9.8</version>\n' +
                '</dependency>\n' +
                '```\n' +
                '\n' +
                '<!-- more -->\n' +
                '\n' +
                '## log4j2.yml\n' +
                '\n' +
                '```\n' +
                'Configuration:\n' +
                '  status: warn\n' +
                '  monitorInterval: 300\n' +
                '\n' +
                '  Appenders:\n' +
                '    Console:\n' +
                '      name: STDOUT\n' +
                '      PatternLayout:\n' +
                '        pattern: "[%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%logger{36}.%t:%L] <%X{uuid}> - %msg%n"\n' +
                '\n' +
                '  Loggers:\n' +
                '    Root:\n' +
                '      level: info\n' +
                '      additivity: true\n' +
                '      AppenderRef:\n' +
                '        - ref: STDOUT\n' +
                '\n' +
                '\n' +
                '```\n' +
                '\n' +
                '## MvcConfigure.java\n' +
                '\n' +
                '```\n' +
                'package com.kangyonggan.demo.configuration;\n' +
                '\n' +
                'import com.htsec.fes.interceptor.UUIDInterceptor;\n' +
                'import org.springframework.context.annotation.Configuration;\n' +
                'import org.springframework.web.servlet.config.annotation.InterceptorRegistry;\n' +
                'import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;\n' +
                '\n' +
                '/**\n' +
                ' * @author longjie\n' +
                ' * @since\n' +
                ' */\n' +
                '@Configuration\n' +
                'public class MvcConfigure implements WebMvcConfigurer {\n' +
                '\n' +
                '    @Override\n' +
                '    public void addInterceptors(InterceptorRegistry registry) {\n' +
                '        // UUID\n' +
                '        registry.addInterceptor(new UUIDInterceptor()).addPathPatterns("/**");\n' +
                '    }\n' +
                '}\n' +
                '\n' +
                '```\n' +
                '\n' +
                '## UUIDInterceptor.java\n' +
                '\n' +
                '```java\n' +
                'package com.kangyonggan.demo.configuration;\n' +
                '\n' +
                'import lombok.extern.log4j.Log4j2;\n' +
                'import org.apache.logging.log4j.ThreadContext;\n' +
                'import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;\n' +
                '\n' +
                'import javax.servlet.http.HttpServletRequest;\n' +
                'import javax.servlet.http.HttpServletResponse;\n' +
                'import java.util.UUID;\n' +
                '\n' +
                '/**\n' +
                ' * @author kangyonggan\n' +
                ' * @since 5/15/18\n' +
                ' */\n' +
                '@Log4j2\n' +
                'public class UUIDInterceptor extends HandlerInterceptorAdapter {\n' +
                '\n' +
                '    @Override\n' +
                '    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {\n' +
                '        // 给log4j2设置线程变量uuid\n' +
                '        ThreadContext.put("uuid", UUID.randomUUID().toString().replaceAll("-", ""));\n' +
                '        return true;\n' +
                '    }\n' +
                '\n' +
                '    @Override\n' +
                '    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {\n' +
                '        // 移除log4j2的线程变量uuid\n' +
                '        ThreadContext.remove("uuid");\n' +
                '    }\n' +
                '\n' +
                '}\n' +
                '```'
        }
    }
};
