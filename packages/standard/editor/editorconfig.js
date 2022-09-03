module.exports = `
[*]
# 缩进风格：空格
indent_style = space
# 缩进大小2
indent_size = 2
# 换行符lf
end_of_line = lf
# 字符集utf-8
charset = utf-8
# 是否删除行尾的空格
trim_trailing_whitespace = true
# 是否在文件的最后插入一个空行
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
insert_final_newline = false

`
