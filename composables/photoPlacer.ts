interface ArticleFile {
  name: string;
  url: string;
  date: string;
}
export const usePhoto = () => useState<ArticleFile>("photo");
