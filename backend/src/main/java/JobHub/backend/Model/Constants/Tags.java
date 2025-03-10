package JobHub.backend.Model.Constants;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Tags {
    NET(".NET"),
    AWS("AWS"),
    ANDROID("Android"),
    ANGULAR("Angular"),
    AZURE("Azure"),
    C("C"),
    CSHARP("C#"),
    CPP("C++"),
    CLOUD("Cloud"),
    DEVOPS("DevOps"),
    DOCKER("Docker"),
    FLUTTER("Flutter"),
    GIT("Git"),
    GRAPHQL("GraphQL"),
    JAVA("Java"),
    JAVASCRIPT("JavaScript"),
    JENKINS("Jenkins"),
    JIRA("Jira"),
    KAFKA("Kafka"),
    KOTLIN("Kotlin"),
    KUBERNETES("Kubernetes"),
    LARAVEL("Laravel"),
    LINUX("Linux"),
    M365("M365"),
    MYSQL("MySQL"),
    NEXTJS("Next.js"),
    NODEJS("Node.js"),
    ORACLE("Oracle"),
    PHP("PHP"),
    POSTGRESQL("PostgreSQL"),
    PYTORCH("PyTorch"),
    PYTHON("Python"),
    REACT("React"),
    RUST("Rust"),
    SCALA("Scala"),
    SELENIUM("Selenium"),
    SQL("SQL"),
    SPRING_BOOT("Spring Boot"),
    SWIFT("Swift"),
    TENSORFLOW("TensorFlow"),
    TYPESCRIPT("TypeScript"),
    VUEJS("Vue.js");

    private final String label;

    Tags(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator  // json->enum
    public static Tags fromLabel(String label) {
        for (Tags tag : values()) {
            if (tag.label.equalsIgnoreCase(label)) {
                return tag;
            }
        }
        throw new IllegalArgumentException("Invalid Tag: " + label);
    }
}
