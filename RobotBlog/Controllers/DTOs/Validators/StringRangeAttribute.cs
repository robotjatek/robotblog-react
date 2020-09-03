using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RobotBlog.Controllers.DTOs.Validators
{
    public class StringRangeAttribute : ValidationAttribute
    {
        public string[] ValidValues { get; set; }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && ValidValues.Contains(value.ToString().ToLowerInvariant()))
            {
                return ValidationResult.Success;
            }
            var member = validationContext.DisplayName;
            var valid = string.Join(", ", ValidValues);
            return new ValidationResult($"{member} must be one of these values: {valid}");
        }
    }
}
