---
layout: post
title: Como gerar cores aleatoriamente em Javascript
categories: color cor javascript rgb hex hsl random function
author: Israel Sant'Anna
date: 2021-10-01 15:00:00 -0300
---
No último post falei sobre como converter cores de rgb para hexadecimal. E como prometido, neste post vou falar sobre como gerar cores aleatoriamente.

### Números aleatórios
Antes de falar sobre cores especificamente, vamos ver como gerar um número aleatoriamente dentro de um intervalo definido.

A função Math.random() gera um número aleatório entre 0 e 1, exclusivamente, ou seja, nunca chega a 1 de fato. Se o intervalo desejado é esse, não é necessário utilizar nenhuma outra função. Para outros intervalos podemos utilizar a seguinte função:

{% include post_image.html
  img="2021-10-01-function-getRandomBetween"
  alt="função javascript getRandomBetween"
%}

Se o valor mínimo for zero, podemos simplificar para:

{% include post_image.html
  img="2021-10-01-function-getRandomUpTo"
  alt="função javascript getRandomUpTo"
%}

> Para outras implementações e casos, veja a [documentação no site da MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
{:class="info"}

### Cores aleatórias
Saber como gerar números aleatórios torna extremamente fácil gerar cores aleatoriamente!

###### RGB
Como dito no último post, o formato rgb utiliza 3 valores que vão de 0 a 255. Esse é o intervalo que precisamos utilizar. Então, para cada valor (r, g, b) precisamos gerar uma cor:

{% include post_image.html
  img="2021-10-01-rgbRandom"
  alt="javascript gerando cor rgb aleatória"
%}

###### HEX
O formato HEX é composto (em uma das formas mais comuns) de 3 pares de dígitos que vão de 00 a FF (pois os valores são em hexadecimal). Então para cada valor (r, g, b) precisamos, além de gerar a cor, converter para hexadecimal:

{% include post_image.html
  img="2021-10-01-hexRandom"
  alt="javascript gerando cor hex aleatória"
%}

###### HSL
O formato HSL (hue, saturation, lightness) utiliza um valor de 0 a 360 para o valor de hue, e um valor de 0% a 100% para saturation e lightness. Então, uma forma de implementar seria:

{% include post_image.html
  img="2021-10-01-hslRandom"
  alt="javascript gerando cor hsl aleatória"
%}

### Conclusão
E é simples assim! Claro que existem muitas outras formas de gerar cores aleatoriamente, até porque existem outras formas de se representar cores (rgba, hsla, hex com três dígitos, entre muitos outros!).

Como você implementaria essa funcionalidade? Deixe um comentário abaixo com sua solução.

Obrigado por ler até aqui, se inscreva [via RSS]({{ "/feed.xml" | relative_url }}) para não perder os próximos artigos, e se esse artigo foi útil pra você, compartilhe com mais pessoas!