/**
72. 编辑距离

给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。

你可以对一个单词进行如下三种操作：

插入一个字符
删除一个字符
替换一个字符

示例 1：

输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
示例 2：

输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')

## 个人分析

字符串通过三个操作从一个变成另一个有什么特点？

生成一个字符串有什么要点？

## 总结分析

字符串 a =》 插入、删除、替换 =》字符串 b
则有：字符串 b =》逆反操作 =》字符串 a
相互替换的操作数是一致的

eg：
horse => rorse => rose => ros
则有
ros => rose => rorse => horse

观察三个操作可知，无论如何，经过若干步骤后总有 x -> y 成立

从示例 horse -> ros 以逆推思想看：

假设若干步骤后，有 x -> ros 只需一步，

 */

function minDistance(word1: string, word2: string): number {}

export default minDistance;
