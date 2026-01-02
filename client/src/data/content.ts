import type { Work, Log, Photo } from "@/types/content";
import contentData from "./content.json";

// 從生成的 content.json 讀取所有內容資料
// 內容由 content/ 資料夾中的 YAML 檔案管理
// 修改內容時，請編輯對應的 YAML 檔案，然後執行 npm run content:generate
const content = contentData as {
  works: Work[];
  logs: Log[];
  photos: Photo[];
};

export const works: Work[] = content.works || [];
export const logs: Log[] = content.logs || [];
export const photos: Photo[] = content.photos || [];

