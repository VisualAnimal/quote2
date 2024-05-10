const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // 删除所有颜色、容量和版本数据
    await prisma.color.deleteMany();
    await prisma.capacity.deleteMany();
    await prisma.version.deleteMany();

    // 删除所有型号和品牌数据
    await prisma.model.deleteMany();
    await prisma.brand.deleteMany();
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
