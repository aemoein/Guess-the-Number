namespace GuessTheNumber.backend.DTOs;
public class GuessResultDto
{
    public int Guess { get; set; }
    public string Result { get; set; } = string.Empty;// "correct", "higher", "lower"
    public int Attempts { get; set; }
    public string Message { get; set; } = string.Empty;
    public int? NewBestScore { get; set; }
}