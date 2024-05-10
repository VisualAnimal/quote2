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
    
    // 创建品牌
    const brands = ['苹果', '华为', '小米', 'oppo'];
    for (const brandName of brands) {
        const brand = await prisma.brand.create({
            data: {
                name: brandName,
            },
        });

        // 创建几个型号
        const models = [];
        for (let i = 1; i <= 3; i++) {
            const model = await prisma.model.create({
                data: {
                    name: `${brandName} ${i}`,
                    brandId: brand.id,
                },
            });
            models.push(model);

            // 在每个型号上创建几种颜色
            const colors = ['黑色', '白色', '蓝色', '红色'];
            for (const color of colors) {
                await prisma.color.create({
                    data: {
                        name: `${model.name} ${color}`,
                        modelId: model.id,
                    },
                });
            }

            // 在每个型号上创建几个版本
            const versions = ['标准版', '高配版', '尊享版'];
            for (const version of versions) {
                await prisma.version.create({
                    data: {
                        name: `${model.name} ${version}`,
                        modelId: model.id,
                    },
                });
            }

            // 在每个型号上创建几个容量
            const capacities = ['64GB', '128GB', '256GB'];
            for (const capacity of capacities) {
                await prisma.capacity.create({
                    data: {
                        size: `${model.name} ${capacity}`,
                        modelId: model.id,
                    },
                });
            }
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
