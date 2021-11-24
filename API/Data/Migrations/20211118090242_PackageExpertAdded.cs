using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class PackageExpertAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExpertId",
                table: "TourPackages",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TourPackages_ExpertId",
                table: "TourPackages",
                column: "ExpertId");

            migrationBuilder.AddForeignKey(
                name: "FK_TourPackages_AspNetUsers_ExpertId",
                table: "TourPackages",
                column: "ExpertId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TourPackages_AspNetUsers_ExpertId",
                table: "TourPackages");

            migrationBuilder.DropIndex(
                name: "IX_TourPackages_ExpertId",
                table: "TourPackages");

            migrationBuilder.DropColumn(
                name: "ExpertId",
                table: "TourPackages");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUserRoles",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
