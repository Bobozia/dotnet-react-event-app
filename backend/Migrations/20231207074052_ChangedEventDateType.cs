using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EventApp.Migrations
{
    /// <inheritdoc />
    public partial class ChangedEventDateType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Events");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Time",
                table: "Events",
                type: "interval",
                nullable: false,
                defaultValue: new TimeSpan());

            migrationBuilder.AddColumn<DateOnly>(
                name: "Date",
                table: "Events",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly());
        }
        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Time",
                table: "Events",
                type: "text",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "interval");

            migrationBuilder.AlterColumn<string>(
                name: "Date",
                table: "Events",
                type: "text",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");
        }
    }
}
