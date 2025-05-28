import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
import path from 'path';

async function optimizeImages() {
  try {
    console.log('🖼️  Otimizando imagens...');

    // Criar diretório de saída se não existir
    const outputDir = 'public/images';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Otimizar PNG para WebP
    await imagemin(['public/images/*.png'], {
      destination: 'public/images',
      plugins: [
        imageminWebp({
          quality: 85,
          method: 6
        })
      ]
    });

    // Otimizar JPG para WebP
    await imagemin(['public/images/*.{jpg,jpeg}'], {
      destination: 'public/images',
      plugins: [
        imageminWebp({
          quality: 85,
          method: 6
        })
      ]
    });

    // Otimizar PNGs originais
    await imagemin(['public/images/*.png'], {
      destination: 'public/images',
      plugins: [
        imageminPngquant({
          quality: [0.8, 0.9]
        })
      ]
    });

    // Otimizar JPGs originais
    await imagemin(['public/images/*.{jpg,jpeg}'], {
      destination: 'public/images',
      plugins: [
        imageminMozjpeg({
          quality: 85
        })
      ]
    });

    console.log('✅ Imagens otimizadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao otimizar imagens:', error);
  }
}

optimizeImages();
