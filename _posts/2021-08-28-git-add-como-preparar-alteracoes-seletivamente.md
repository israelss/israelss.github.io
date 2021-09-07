---
layout: post
title: Git add - Como preparar alterações seletivamente
categories: git git-add git-commit patch git-log
author: Israel Sant'Anna
date: 2021-08-28 15:00:00 -0300
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

<code class="prompt">git init</code>

Agora, criamos um arquivo chamado `teste.txt` e adicionamos algum conteúdo ao mesmo:

<code class="prompt">echo "Uma frase qualquer" > teste.txt</code>

{% include post_image.html
  img="2021-08-28-git-add-1"
  alt="comando: bat teste.txt"
%}

Já temos uma modificação, então vamos adicioná-la e fazer o primeiro commit:

{% include post_image.html
  img="2021-08-28-git-add-2"
  alt="comando: git status"
%}

<code class="prompt">
git add teste.txt
</code>

{% include post_image.html
  img="2021-08-28-git-add-3"
  alt="comando: git status"
%}

<code class="prompt">
git commit -m 'Adiciona o arquivo teste.txt'
</code>

{% include post_image.html
  img="2021-08-28-git-add-4"
  alt="comando: git commit -m 'Adiciona o arquivo teste.txt'"
%}

Agora, se alterarmos este arquivo, adicionando conteúdo antes e depois do conteúdo atual, teremos dois pedaços (_hunk_) de alteração, um antes do conteúdo antigo e outro depois:

{% include post_image.html
  img="2021-08-28-git-add-5"
  alt="comando: bat teste.txt"
%}

{% include post_image.html
  img="2021-08-28-git-add-6"
  alt="comando: git diff"
%}

Se o próximo comando for `git add .` ou `git add teste.txt` os dois _hunks_ serão preparados, já que estão no mesmo arquivo.
Porém existe uma forma de preparar um ou mais _hunks_ seletivamente. É para isso que serve a flag `--patch` ou, resumidamente `-p`. De acordo com o manual (`man git-add`):

{% include post_image.html
  img="2021-08-28-git-add-7"
  alt="comando: man git-add -> flags -p --patch e -i --interactive"
%}

Então, se rodarmos o comando `git add -p`, nós vamos ter algumas opções para trabalhar com os pedaços de alteração:

{% include post_image.html
  img="2021-08-28-git-add-8"
  alt="comando: git add -p"
%}

> y - preparar este pedaço\
> n - não preparar este pedaço\
> q - sair; não preparar este pedaço nem qualquer um dos pedaços restantes\
> a - preparar este pedaço e todos os outros pedaços restantes no arquivo\
> d - não preparar este pedaço nem qualquer um dos pedaços restantes no arquivo\
> s - dividir este pedaço em pedaços menores\
> e - editar manualmente este pedaço\
> ? - exibir ajuda
{: class="info"}

Neste caso, o que queremos é dividir os pedaços, para podermos selecionar e preparar apenas uma parte para commitar. Então selecionamos a opção `s`:

{% include post_image.html
  img="2021-08-28-git-add-9"
  alt="comando: s"
%}

Agora, o git dividiu aquele pedaço em dois. Você pode estar se perguntando "Como ele sabe onde dividir?". Bem, em termos bem simples, todo conteúdo não alterado é tratado como um possível splitpoint. No nosso caso, é a frase `Uma frase qualquer`.

Então, temos agora algumas opções diferentes das primeiras, aplicando-se apenas ao primeiro pedaço, mas não vamos focar explorar as opções novas hoje. Vamos preparar este primeiro pedaço, com a opção `y`. E como não vamos adicionar o segundo pedaço agora, pois queremos incluir essas alterações em um commit separado, usamos a opção `d` em seguida:

{% include post_image.html
  img="2021-08-28-git-add-10"
  alt="comandos: y then d"
%}

> Obs: Poderíamos ter usado a opção `q` também, mas como só temos um arquivo com alterações, neste caso o efeito prático é o mesmo.
{: class="info"}

Para confirmar que há alterações preparadas (_staged_) e alterações não preparadas (_not staged_) no mesmo arquivo, podemos usar o comando `git status`, e para ver quais as alterações não preparadas pordemos usar o comando `git diff`:

{% include post_image.html
  img="2021-08-28-git-add-11"
  alt="comandos: git status then git diff"
%}

Agora, vamos fazer o commit da primeira alteração:

{% include post_image.html
  img="2021-08-28-git-add-12"
  alt="comandos: git commit -m 'Primeira alteraçao' then git status && git diff"
%}

Agora podemos adicionar o segundo pedaço com `git add teste.txt`, ou usar novamente o comando `git add -p` para editar manualmente, já que neste caso não será possível dividir automaticamente, pois não temos nenhum conteúdo não alterado entre alterações.
Não vamos editar manualmente neste artigo, vamos usar a opção `y`:

{% include post_image.html
  img="2021-08-28-git-add-13"
  alt="comandos: git add -p then y"
%}

> Obs: Poderíamos ter usado a opção `a` também, mas como só temos uma alteração no arquivo, neste caso o efeito prático é o mesmo.
{: class="info"}

{% include post_image.html
  img="2021-08-28-git-add-14"
  alt="comandos: git commit -m 'Segunda alteraçao' then git status"
%}

Para conferirmos que as alterações foram preparadas separadamente e estão em commits diferentes, podemos usar o comando `git log -p`

{% include post_image.html
  img="2021-08-28-git-add-15"
  alt="comando: git log -p"
%}

Esta é a forma que eu encontrei para preparar seletivamente as modificações que devem estar em cada commit. Você conhece alguma outra forma? Me conte nos comentários abaixo!

E assim chegamos ao fim deste artigo! Obrigado por ler até aqui e pela paciência com este escritor novato! Espero ter contribuído para a construção do seu conhecimento!

O que você achou deste conteúdo? Deixe um comentário abaixo com críticas, elogios ou sugestões para os próximos artigos.