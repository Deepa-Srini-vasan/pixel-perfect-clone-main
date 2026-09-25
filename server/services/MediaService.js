import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MediaRepository } from '../repositories/MediaRepository.js';

const mediaRepo = new MediaRepository();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

export class MediaService {
  async ensureUploadDir() {
    try {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
    } catch (e) {}
  }

  async saveFile(filename, mimeType, buffer, adminId) {
    await this.ensureUploadDir();

    // Unique filename
    const ext = path.extname(filename);
    const base = path.basename(filename, ext).replace(/[^a-zA-Z0-9]/g, '_');
    const uniqueName = `${base}_${Date.now()}${ext}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);

    // Save physical file
    await fs.writeFile(filePath, buffer);

    const relativePath = `/uploads/${uniqueName}`;

    // Register in DB
    const id = await mediaRepo.create({
      filename: uniqueName,
      mime_type: mimeType,
      file_size: buffer.length,
      file_path: relativePath,
      uploaded_by: adminId,
    });

    return {
      id,
      filename: uniqueName,
      filePath: relativePath,
    };
  }

  async getMediaItem(id) {
    return await mediaRepo.find(id);
  }
}
export const mediaService = new MediaService();
