package chiniara.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Calendar;
import java.util.Objects;
import java.util.Optional;

@Entity
@SequenceGenerator(name = "seq_todo", sequenceName = "seq_todo", allocationSize = 1)
public class Todo {

    @Id
    @GeneratedValue(generator = "seq_todo", strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    private Calendar dataCriacao = Calendar.getInstance();

    @Column
    @NotNull
    private String descricao;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Calendar dataTermino;

    // ---

    public Long getUriId() {
        return id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Calendar getDataCriacao() {
        return this.dataCriacao;
    }

    public void setDataCriacao(Calendar dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getDescricao() {
        Objects.requireNonNull(this.descricao);
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Optional<Calendar> getDataTermino() {
        return Optional.ofNullable(dataTermino);
    }
}
