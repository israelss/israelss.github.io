---
layout: post
title: Git - Como commitar parte das alterações em um mesmo arquivo
categories: git git-add git-commit patch
author: Israel Sant'Anna
date: 2021-08-21 21:10:00 -0300
---

Quando começamos a aprender sobre como usar o Git, aprendemos que o fluxo básico de trabalho, superficialmente falando, é:

1. Realizar as modificações nos arquivos;
2. `git add` para incluir o[s] arquivo[s] alterado[s] na área de preparação (_staging area_);
3. `git commit` para adicionar todos os arquivos preparados ao repositório local;
4. `git push` para enviar todos os arquivos comitados no repositório local para o repositório remoto.

Uma das formas mais comuns de se usar o comando `git add` é usando um `.` como argumento, ou seja, incluindo todos os arquivos que sofreram alguma alteração.
Outra forma é usando o nome de um ou mais arquivos específicos, para adicionar apenas estes à _staging area_.

Mas qualquer uma destas formas adiciona todas as modificações realizadas nos arquivos. E se quisermos adicionar apenas **parte** das alterações?

Vamos para um exemplo:

Primeiro vamos iniciar um repositório local (para este artigo não vamos precisar de um repositóio remoto):

```sh
git init
```

Agora, criamos um arquivo chamado `teste.txt` e adicionamos algum conteúdo ao mesmo:

```sh
echo "Uma frase qualquer" > teste.txt
```

![Teste.txt](/assets/images/blog/teste.txt1.png){: .center-image}

Já temos uma modificação, então vamos adicioná-la e fazer o primeiro commit:

![Teste.txt](/assets/images/blog/teste.txt2.png){: .center-image}

```sh
git add teste.txt
```

![Teste.txt](/assets/images/blog/teste.txt3.png){: .center-image}

```sh
git commit -m 'Adiciona o arquivo teste.txt'
```

![Teste.txt](/assets/images/blog/teste.txt5.png){: .center-image}

Agora, se alterarmos este arquivo, adicionando conteúdo antes e depois do conteúdo atual, teremos dois pedaços (_hunk_) de alteração, um antes do conteúdo antigo e outro depois:

![Teste.txt](/assets/images/blog/teste.txt7.png){: .center-image}
![Teste.txt](/assets/images/blog/teste.txt8.png){: .center-image}

Se o próximo comando for `git add .` ou `git add teste.txt` os dois _hunks_ serão adicionados, já que estão no mesmo arquivo.
Porém existe uma forma de adicionar um ou mais _hunks_ seletivamente. É para isso que serve a flag `--patch` ou, resumidamente `-p`. De acordo com o manual (`man git-add`):
![Teste.txt](/assets/images/blog/teste.txt10.png){: .center-image}
Então, se rodarmos o comando `git add -p`, nós vamos ter algumas opções para trabalhar com os pedaços de alteração:

![Teste.txt](/assets/images/blog/teste.txt9.png){: .center-image}
