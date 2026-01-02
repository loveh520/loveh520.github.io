import { readdir, readFile, writeFile, stat } from "fs/promises";
import { resolve } from "path";
import yaml from "js-yaml";

interface ContentData {
  works: any[];
  logs: any[];
  photos: any[];
}

async function generateContent() {
  const contentPath = resolve(process.cwd(), "content");
  const outputPath = resolve(process.cwd(), "client", "src", "data", "content.json");
  const data: ContentData = {
    works: [],
    logs: [],
    photos: [],
  };

  // Load works
  try {
    const worksDir = resolve(contentPath, "works");
    const workFiles = await readdir(worksDir);
    for (const file of workFiles) {
      if (file.endsWith(".yaml") || file.endsWith(".yml")) {
        const filePath = resolve(worksDir, file);
        const fileStat = await stat(filePath);
        if (fileStat.isFile()) {
          const content = await readFile(filePath, "utf-8");
          const work = yaml.load(content) as any;
          const slug = file.replace(/\.(yaml|yml)$/, "");
          work.slug = slug;
          // 驗證圖片 URL
          if (work.imageUrl && !work.imageUrl.startsWith("/attached_assets/")) {
            console.warn(`警告: 作品 "${work.title}" 的圖片 URL "${work.imageUrl}" 應該以 "/attached_assets/" 開頭`);
          }
          data.works.push(work);
        }
      }
    }
    // Sort by id descending
    data.works.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  } catch (error) {
    console.warn("Failed to load works:", error);
  }

  // Load logs
  try {
    const logsDir = resolve(contentPath, "logs");
    const logFiles = await readdir(logsDir);
    for (const file of logFiles) {
      if (file.endsWith(".yaml") || file.endsWith(".yml")) {
        const filePath = resolve(logsDir, file);
        const fileStat = await stat(filePath);
        if (fileStat.isFile()) {
          const content = await readFile(filePath, "utf-8");
          const log = yaml.load(content) as any;
          const slug = file.replace(/\.(yaml|yml)$/, "");
          log.slug = slug;
          data.logs.push(log);
        }
      }
    }
    // Sort by date descending
    data.logs.sort((a, b) => {
      try {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      } catch {
        return 0;
      }
    });
  } catch (error) {
    console.warn("Failed to load logs:", error);
  }

  // Load photos
  try {
    const photosFile = resolve(contentPath, "photos", "photos.yaml");
    const content = await readFile(photosFile, "utf-8");
    const photosData = yaml.load(content) as { photos: any[] };
    if (photosData.photos) {
      // 驗證每個照片的 URL
      for (const photo of photosData.photos) {
        if (photo.url && !photo.url.startsWith("/attached_assets/")) {
          console.warn(`警告: 照片 "${photo.alt || photo.id}" 的 URL "${photo.url}" 應該以 "/attached_assets/" 開頭`);
        }
      }
      data.photos = photosData.photos;
    }
  } catch (error) {
    console.warn("Failed to load photos:", error);
  }

  // Write to JSON file
  await writeFile(outputPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Content generated successfully: ${outputPath}`);
  console.log(`  - Works: ${data.works.length}`);
  console.log(`  - Logs: ${data.logs.length}`);
  console.log(`  - Photos: ${data.photos.length}`);
}

generateContent().catch(console.error);

