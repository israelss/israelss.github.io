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
Outra forma é usando o nome de um ou mais arquivos específicos, para adicionar apenas estes à _staging area_, ou seja, preparar (_stage_) as alterações.

Mas qualquer uma destas formas prepara **todas as modificações** realizadas nos arquivos. E se quisermos preparar apenas **parte** das alterações?

Vamos para um exemplo:

Primeiro vamos iniciar um repositório local (para este artigo não vamos precisar de um repositóio remoto):

```sh
git init
```

Agora, criamos um arquivo chamado `teste.txt` e adicionamos algum conteúdo ao mesmo:

```sh
echo "Uma frase qualquer" > teste.txt
```

![comando: bat teste.txt](/assets/images/blog/teste.txt1.png)

Já temos uma modificação, então vamos adicioná-la e fazer o primeiro commit:

![comando: git status](/assets/images/blog/teste.txt2.png)

```sh
git add teste.txt
```

![comando: git status](/assets/images/blog/teste.txt3.png)

```sh
git commit -m 'Adiciona o arquivo teste.txt'
```

![comando: git commit -m 'Adiciona o arquivo teste.txt'](/assets/images/blog/teste.txt5.png)

Agora, se alterarmos este arquivo, adicionando conteúdo antes e depois do conteúdo atual, teremos dois pedaços (_hunk_) de alteração, um antes do conteúdo antigo e outro depois:

![comando: bat teste.txt](/assets/images/blog/teste.txt7.png)

![comando: git diff](/assets/images/blog/teste.txt8.png)

Se o próximo comando for `git add .` ou `git add teste.txt` os dois _hunks_ serão preparados, já que estão no mesmo arquivo.
Porém existe uma forma de preparar um ou mais _hunks_ seletivamente. É para isso que serve a flag `--patch` ou, resumidamente `-p`. De acordo com o manual (`man git-add`):

![comando: man git-add | flags -p --patch e -i --interactive](/assets/images/blog/teste.txt10.png)

Então, se rodarmos o comando `git add -p`, nós vamos ter algumas opções para trabalhar com os pedaços de alteração:

![comando: git add -p](/assets/images/blog/teste.txt9.png)


> y - preparar este pedaço\
> n - não preparar este pedaço\
> q - sair; não preparar este pedaço nem qualquer um dos pedaços restantes\
> a - preparar este pedaço e todos os outros pedaços restantes no arquivo\
> d - não preparar este pedaço nem qualquer um dos pedaços restantes no arquivo\
> s - dividir este pedaço em pedaços menores\
> e - editar manualmente este pedaço\
> ? - exibir ajuda

Neste caso, o que queremos é dividir os pedaços, para podermos selecionar e preparar apenas uma parte para commitar. Então selecionamos a opção `s`:

![comando: s](/assets/images/blog/teste.txt10_.png)

Agora, o git dividiu aquele pedaço em dois. Você pode estar se perguntando "Como ele sabe onde dividir?". Bem, em termos bem simples, todo conteúdo não alterado é tratado como um possível splitpoint. No nosso caso, é a frase `Uma frase qualquer`.

Então, temos agora as mesmas opções de antes, mas aplicando-se apenas ao primeiro pedaço. Vamos prepará-lo, e criar o primeiro commit:

![comando: y](/assets/images/blog/teste.txt11_.png)

Não vamos adicionar o segundo pedaço agora, pois queremos incluir essas alterações em um commit separado:

![comando: d](/assets/images/blog/teste.txt11_.png)

> Obs: Poderíamos ter usado a opção `q` também, mas como só temos um arquivo com alterações, neste caso o efeito prático é o mesmo.

![comando: git commit -m 'Primeira alteraçao'](/assets/images/blog/teste.txt12.png)

![comando: git status](/assets/images/blog/teste.txt13.png)

![comando: git diff](/assets/images/blog/teste.txt14.png)

Agora podemos adicionar o segundo pedaço com `git add teste.txt`, ou usar novamente o comando `git add -p` para editar manualmente, já que neste caso não será possível dividir automaticamente, pois não temos nenhum conteúdo não alterado entre alterações:

![comando: git add -p](/assets/images/blog/teste.txt15.png)

Não vamos editar manualmente neste artigo, vamos usar a opção `y`:


![comando: y](/assets/images/blog/teste.txt16.png)

> Obs: Poderíamos ter usado a opção `a` também, mas como só temos uma alteração no arquivo, neste caso o efeito prático é o mesmo.

![comando: git commit -m 'Primeira alteraçao'](/assets/images/blog/teste.txt17.png)

![comando: git status](/assets/images/blog/teste.txt18.png)

TODO: git log -c || git log -p

Para conferirmos que as alterações foram preparadas separadamente e estão em commits diferentes, podemos usar o comando `git log -c`

![comando: git log -c](/assets/images/blog/teste.txt19.png)

Esta é a forma que eu encontrei para preparar seletivamente as modificações que devem estar em cada commit. Você conhece alguma outra forma? Me conte nos comentários abaixo!

E assim chegamos ao fim deste artigo! Obrigado por ler até aqui e pela paciência com este escritor novato! Espero ter contribuído para a construção do seu conhecimento!

O que você achou deste conteúdo? Deixe um comentário abaixo com críticas, elogios ou sugestões para os próximos artigos.