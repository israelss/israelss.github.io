---
layout: post
title: Como converter uma cor de RGB para HEX em Javascript
categories: color cor javascript rgb hex converter
author: Israel Sant'Anna
date: 2021-09-16 15:00:00 -0300
---

#### Formatos de cor

Quando queremos representar uma cor, podemos usar vários formatos. O meu preferido é o HSL, mas muitas vezes precisamos usar RGB ou então HEX. E algumas vezes precisamos converter uma cor de um formato para outro. Neste artigo veremos como é simples converter de RGB para HEX, com um pouquinho de matemática e funções nativas do Javascript.

###### RGB x HEX
Antes de realizar qualquer tipo de conversão, precisamos entender minimamente como cada formato funciona.

As cores em RGB são compostas de três valores no formato `rgb(Red, Green, Blue)`. Cada valor vai de 0 a 255, **na base 10**. Quanto mais próximo de 0, menor a intensidade do canal, quanto mais próximo de 255, maior a intensidade do canal.

Por exemplo, `rgb(255, 0, 0)` é a representação da cor vermelha; `rgb(0, 255, 0)` é verde; e `rgb(0, 0, 255)` é azul. Conforme os valores são misturados, conseguimos representar até 256 * 256 *256 = 16777216 cores, sendo `rgb(0, 0, 0)` a cor preta e `rgb(255, 255, 255)` a cor branca.

O máximo de cores que podem ser representadas em HEX também é 16777216, porém, os valores de Red, Green e Blue são representadas por valores em hexadecimal, ou seja, **na base 16**, de 00 a FF, no formato `#rrggbb`.

Por exemplo, `#ff0000` é a representação da cor vermelha; `#00ff00` é verde; e `#0000ff` é azul. `#000000` é a cor preta e `#ffffff` a cor branca.

Sabendo então que nos dois formatos temos 256 valores possíveis para cada canal de cor, mudando apenas a base (decimal ou hexadecimal), fica fácil realizar a conversão: Devemos converter cada valor, individualmente da base 10 para a base 16!

#### Convertendo

Vamos fazer um exemplo:

> Converter rgb(167, 202, 56) para HEX:  
> Red:167  
> Green:202  
> Blue:56  
>
> Em hexadecimal:  
> Red:A7  
> Green:CA  
> Blue:38  
>
> `rgb(167, 202, 56) === #a7ca38`

Calma, calma, calma... Como exatamente foi feita essa conversão? Como podemos escrever isso em código?

Não vou entrar em detalhes de como converter bases, mas basicamente, para converter um número X da base 10 para 16, devemos:
1. **Dividir X por 16**. A parte inteira do resultado é o primeiro componente em hexadecimal.
2. **Multiplicar o resto da divisão anterior por 16**. Esse é o segundo componente em hexadecimal.

No nosso exemplo:

> r = 167<sub>10</sub>; (167<sub>10</sub> = 167 na base 10)  
> g = 202<sub>10</sub>;  
> b = 56<sub>10</sub>;
>
> 167 / 16 = 10,4375  
> r<sub>1</sub> = 10<sub>10</sub> = A<sub>16</sub> (A<sub>16</sub> = A na base 16)  
> r<sub>2</sub> = 0,4375 * 16 = 7
> 
> `r` = 167<sub>10</sub> = A7<sub>16</sub>
>
> 202 / 16 = 12,625  
> g<sub>1</sub> = 12<sub>10</sub> = C<sub>16</sub>  
> g<sub>2</sub> = 0,625 * 16 = 10<sub>10</sub> = A<sub>16</sub>
> 
> `g` = 202<sub>10</sub> = CA<sub>16</sub>
>
> 56 / 16 = 3,5
> b<sub>1</sub> = 3  
> b<sub>2</sub> = 0,5 * 16 = 8
> 
> `b` = 56<sub>10</sub> = 38<sub>16</sub>

#### Ok. Now show me the code!

Uma possível implementação, em Javascript, seria:

{% include post_image.html
  img="2021-09-16-convertRgbToHex-1"
  alt="função javascript convertRgbToHex"
%}

No próximo artigo vou mostrar uma forma de gerar cores aleatoriamente, se inscreva [via RSS]({{ "/feed.xml" | relative_url }}) para não perder! ;)

Então, sabendo qual a lógica por trás da conversão, como você impmementaria essa função? Deixe nos comentários abaixo!