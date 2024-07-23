import { Result } from "@/model";
import request from "@/utils/request";
import { Promise } from "axios";
import { ArticleConditionList, ArticleQuery } from "../article/types";
import { Category } from "./types";

/**
 * 查看文章分类
 * @returns 文章分类
 */
export function getCategoryList(): Promise<Result<Category[]>> {
  return request({
    url: "/category/list",
    method: "get",
  });
}

/**
 * 查看分类文章
 * @returns 文章分类
 */
export function getCategoryArticleList(
  params: ArticleQuery,
): Promise<Result<ArticleConditionList>> {
  return request({
    url: "/category/article",
    method: "get",
    params,
  });
}
