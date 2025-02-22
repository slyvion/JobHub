package JobHub.backend.Model.Constants;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Tags {
    ANGULAR("Angular"),
    ANDROID("Android"),
    AWS("AWS"),
    AZURE("Azure"),
    C("C"),
    CPP("C++"),
    CSHARP("C#"),
    CLOUD("Cloud"),
    DEVOPS("DevOps"),
    DOCKER("Docker"),
    FLUTTER("Flutter"),
    GIT("Git"),
    GRAPHQL("GraphQL"),
    IOS("iOS"),
    JENKINS("Jenkins"),
    JIRA("Jira"),
    KAFKA("Kafka"),
    KOTLIN("Kotlin"),
    KUBERNETES("Kubernetes"),
    LARAVEL("Laravel"),
    LINUX("Linux"),
    MYSQL("MySQL"),
    M365("M365"),
    NET(".NET"),
    NODEJS("Node.js"),
    NEXTJS("Next.js"),
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
    VUEJS("Vue.js"),
    JAVA("Java");

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
